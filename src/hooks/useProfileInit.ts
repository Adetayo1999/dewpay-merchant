import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLazyGetProfileQuery } from "../store/api/merchantApi";
import { setProfile } from "../store/slices/authSlice";

export const useProfileInit = () => {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.auth);
  const [getProfile] = useLazyGetProfileQuery();

  useEffect(() => {
    const initializeProfile = async () => {
      // Only fetch if we have a token but no user data (or user data is incomplete)
      if (token && (!user || !user.email)) {
        const merchantId = localStorage.getItem("merchantId");
        if (merchantId) {
          try {
            const profileResult = await getProfile({
              merchant_id: merchantId,
            }).unwrap();
            dispatch(setProfile(profileResult));
          } catch (error) {
            console.error("Failed to initialize profile:", error);
          }
        }
      }
    };

    initializeProfile();
  }, [token, user, getProfile, dispatch]);
};

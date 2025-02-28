//React Native Stateless Componant

import {useMemo}from "react";
import { useProfile } from "../context/ProfileProvider";

const  useHasOnboarding = ( ) => {

  const {profile}=useProfile();

  const hasOnboarding = useMemo(() => !!profile?.hasOnboarding, [profile]);

  return hasOnboarding;
};
export default  useHasOnboarding;


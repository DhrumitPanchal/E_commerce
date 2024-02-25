import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Redux/Context";
function ProfilePage() {
  const { user } = useContext(Context);
  const navigator = useNavigate();
  useEffect(() => {
    if (user?.userId === "") {
      navigator("/login");
    }
  });
  return <div>ProfilePage</div>;
}

export default ProfilePage;

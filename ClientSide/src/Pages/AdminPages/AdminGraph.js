import React, { useContext, useEffect } from "react";
import { Context } from "../../Redux/Context";
import { useNavigate } from "react-router-dom";
function AdminGraph() {
  const { user } = useContext(Context);
  const navigator = useNavigate();

  useEffect(() => {
    user?.userRole !== "admin" && navigator("/admin");
  });
  return <div>AdminGraph</div>;
}

export default AdminGraph;

import React, { useState } from "react";
// import bg from "assets/media/illustrations/sketchy-1/14-dark.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/slices/loginSlice";
// import { callAPI } from "../utils/fetchAPIs";

export default function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPActive, setIsOTPActive] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    otp: "",
  });

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (!isOTPActive) {
      if (!loginData.email) {
        toast.error("Please provide a valid email to login");
        return;
      }
      setIsOTPActive(true);
      // trigger OTP mail here
    } else {
      if (!loginData.email) {
        toast.error("Please provide a valid email to login");
        return;
      }
      if (!loginData.otp) {
        toast.error("Please provide a valid OTP to login");
        return;
      }
      setIsLoading(true);
      dispatch(loginHandler({ email: loginData.email }));

      toast.success("Successfully logged in");
      // let res = await callAPI("POST", "auth2/login", loginData, null);
      // if (res?.status) {
      //   dispatch(loginHandler(res));

      //   toast.success("Successfully logged in");
      // } else {
      //   toast.error("Please provide correct email and password");
      // }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root" style={{ height: "100vh" }}>
        <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
          <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
            <h3 className="text-center">Sri Aurobindo Seva Kendra</h3>
            <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto border">
              <form onSubmit={loginSubmit} className="form w-100">
                <div className="text-center mb-5">
                  <h3 className="text-dark">Login to Patient Portal</h3>
                </div>
                {!isOTPActive && (
                  <div className="fv-row mb-3">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      Email
                    </label>

                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="email"
                      name="email"
                      autoComplete="off"
                      value={loginData?.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                  </div>
                )}
                {isOTPActive && (
                  <div className="fv-row mb-3">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      OTP
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      name="otp"
                      autoComplete="off"
                      value={loginData?.otp}
                      onChange={(e) =>
                        setLoginData({ ...loginData, otp: e.target.value })
                      }
                    />
                  </div>
                )}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100 mb-5"
                  >
                    {!isLoading ? (
                      <span className="indicator-label">
                        {!isOTPActive ? "Send OTP" : "Verify OTP"}
                      </span>
                    ) : (
                      <span className="indicator-label">Please wait...</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

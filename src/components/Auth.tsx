import { SignupInput } from "@aishikd2/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      // @ts-expect-error e is known
      if (e.response) alert(e.response.data.error);
      else alert(e);
    }
  }

  return (
    <div className="h-svh flex justify-center items-center">
      <div className="flex justify-center items-center flex-col max-w-lg w-full px-2">
        <div className="font-bold text-3xl px-1">
          {type === "signup" ? "Create an account" : "Sign in to your account"}
        </div>
        <div className="text-slate-500 pb-4">
          {type === "signup" ? (
            <span>
              Already have an account?{" "}
              <Link to="/signin" className="underline">
                Login
              </Link>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </span>
          )}
        </div>

        {type === "signup" ? (
          <LabelledInput
            label="Name"
            type="text"
            placeholder="Aishik Dutta.."
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                name: e.target.value,
              }));
            }}
          />
        ) : null}

        <LabelledInput
          label="Email"
          type="text"
          placeholder="example@company.com"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              email: e.target.value,
            }));
          }}
        />

        <LabelledInput
          label="Password"
          type="password"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              password: e.target.value,
            }));
          }}
        />

        <button
          onClick={sendRequest}
          className="mt-5 px-3 py-2 bg-gray-900 text-slate-50 w-full rounded-md hover:bg-gray-800 focus:ring-1 focus:ring-sky-500 font-semibold"
        >
          {type === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

interface LabbelledInputType {
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabbelledInputType) => {
  return (
    <div className="max-w-sm w-screen">
      <label className="block w-full mt-3">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-bold text-slate-700">
          {label}
        </span>
        <input
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm"
        />
      </label>
    </div>
  );
};

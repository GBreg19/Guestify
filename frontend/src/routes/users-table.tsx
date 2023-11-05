import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import Loader from "../components/loader";
import ErrorMessage from "@/components/error-message";

import PageBadge from "@/components/page-badge";
import Container from "@/components/container";
import GuestsTable from "@/components/guests-table";
import AlertMessage from "@/components/alert-message";
import { fetchUsers, isAdding } from "@/store/users-slice";
import { FaHouseUser } from "react-icons/fa6";
import { VscAdd } from "react-icons/vsc";

const UsersTable = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { usersData, loading, error, successMessage, errorMessage } =
    useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ actionType: "GET" }));
  }, [dispatch]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      setShowAlert(true);

      const timerId = setTimeout(() => {
        setShowAlert(false);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [successMessage, errorMessage]);

  return (
    <Container>
      <PageBadge title="Guest List" />
      {loading && <Loader />}
      {error && <ErrorMessage errorMessage={error} />}
      {!loading && !error && (
        <div>
          <div className="flex justify-between items-center mb-5">
            <div className="border-[1px] flex w-52 justify-between px-3 py-3 bg-slate-100">
              <FaHouseUser className="text-xl text-indigo-600" />
              <h1 className="font-Noto-Med">{`Guests invited (${usersData.length})`}</h1>
            </div>
            <div className="mr-5">
              <button
                onClick={() => dispatch(isAdding(true))}
                className="text-xl p-1 rounded-full bg-indigo-600 text-white"
                title="Add new guest"
              >
                <VscAdd className="" />
              </button>
            </div>
          </div>
          <GuestsTable />
        </div>
      )}
      {showAlert && <AlertMessage />}
    </Container>
  );
};

export default UsersTable;

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  UsersObject,
  fetchUsers,
  isAdding,
  isDeleting,
  isEditing,
  isOpened,
} from "@/store/guests-slice";
import { Button } from "./ui/button";
import UserForm from "./guest-form";
import GuestCard from "./guest-card";

interface ModalProps {
  selectedUser?: UsersObject | null;
}

const Modal = ({ selectedUser }: ModalProps) => {
  const { adding, editing, deleting, isGuestProfileOpened } = useAppSelector(
    (store) => store.users
  );
  const dispatch = useAppDispatch();

  const cancelAction = () => {
    dispatch(isDeleting(false));
    dispatch(isEditing(false));
    dispatch(isAdding(false));
    dispatch(isOpened(false));
  };

  const userDeleteHandler = async () => {
    if (selectedUser) {
      try {
        await dispatch(
          fetchUsers({ actionType: "DELETE", id: selectedUser._id })
        );
        dispatch(isDeleting(false));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <div
        onClick={cancelAction}
        className="fixed top-0 left-0 w-full h-full z-40 bg-white/[0.1] backdrop-blur-sm"
      ></div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50">
        {isGuestProfileOpened && <GuestCard user={selectedUser} />}
        <div className="bg-blue-600 w-[500px] rounded-md">
          {adding && <UserForm />}
          {editing && <UserForm user={selectedUser} />}
        </div>
        {deleting && (
          <div className="w-[500px] rounded-md bg-indigo-600 text-white font-Noto-Reg p-5 flex flex-col gap-5">
            <h1 className="font-bold text-xl">Are you sure?</h1>
            <p>
              This action cannot be undone and will permanently remove the user
              and their data from our servers.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={cancelAction}
                className="bg-slate-100 text-black hover:bg-slate-300"
              >
                Cancel
              </Button>
              <Button
                onClick={userDeleteHandler}
                className="bg-slate-100 text-black hover:bg-slate-300"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

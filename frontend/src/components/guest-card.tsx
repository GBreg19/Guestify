import { UsersObject, isEditing, isOpened } from "@/store/users-slice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CiEdit } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/store/hooks";
import Social from "./social";
import { Button } from "./ui/button";

interface CardProps {
  user?: UsersObject | null;
}

const GuestCard = ({ user }: CardProps) => {
  const dispatch = useAppDispatch();

  return (
    user && (
      <Card className="max-w-xl flex gap-5 shadow-md shadow-slate-400 p-4">
        <CardHeader>
          <Avatar className="m-auto w-44 h-44 rounded-md">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardFooter className="p-0 flex flex-col items-start justify-between">
          <CardTitle className="text-2xl font-Noto-Bold">{user.name}</CardTitle>
          <CardContent className="text-sm text-slate-600 font-Noto-LightIta p-0">
            {user.email}
          </CardContent>
          <CardContent className="text-center p-0">
            <p>
              Address: {user.address.city} ({user.address.street})
            </p>
          </CardContent>
          <CardContent className="p-0 flex gap-3">
            <Button
              onClick={() => {
                dispatch(isEditing(true));
                dispatch(isOpened(false));
              }}
              className="px-10 bg-inherit border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              Edit
            </Button>
            <Button className="px-10 bg-inherit border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
              Delete
            </Button>
          </CardContent>
        </CardFooter>
      </Card>
    )
  );
};

export default GuestCard;

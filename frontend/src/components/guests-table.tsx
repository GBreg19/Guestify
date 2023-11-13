import {
  UsersObject,
  isDeleting,
  isEditing,
  isOpened,
  selectGuests,
} from "@/store/guests-slice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { SlOptions } from "react-icons/sl";
import Modal from "@/components/modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRef, useState } from "react";
import SelectInput from "./select-input";

const GuestsTable = () => {
  const [selectedUser, setSelectedUser] = useState<UsersObject | null>(null);
  const [issingleChecked, setIsSingleChecked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const { usersData, deleting, editing, adding, isGuestProfileOpened } =
    useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const usersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(usersData.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = usersData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onAllSelect = () => {
    // setIsAllChecked((current) => !current);
    setIsSingleChecked((current) => !current);
  };
  console.log(isAllChecked)

  const onSingleSelect = (id: string) => {
    setIsSingleChecked((current) => !current);
  };

  return (
    <>
      <Table className="">
        <TableHeader className="bg-black">
          <TableRow className="font-Noto-BoldIta">
            <TableHead className="pr-0 w-5">
              <SelectInput value={isAllChecked} onClick={onAllSelect} />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>City</TableHead>
            <TableHead className="flex items-center justify-end">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedUsers.map((user) => {
            return (
              <TableRow key={user._id} className="font-Noto-Reg">
                <TableCell>
                  <SelectInput
                    value={issingleChecked}
                    onClick={() => onSingleSelect(user._id!)}
                  />
                </TableCell>
                <TableCell>
                  <span
                    title={`Click to open ${
                      user.name.split(" ")[0]
                    }'s personal window`}
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(isOpened(true));
                      setSelectedUser(user);
                    }}
                  >
                    {user.name}
                  </span>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address.city}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" title="Click for actions">
                        <SlOptions />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedUser(user);
                          dispatch(isEditing(true));
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedUser(user);
                          dispatch(isDeleting(true));
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex gap-3 mt-3 justify-center">
        <Button
          className="bg-indigo-700 hover:bg-indigo-600"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          className="bg-indigo-700 hover:bg-indigo-600"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      {(deleting || editing || adding || isGuestProfileOpened) && (
        <Modal selectedUser={selectedUser} />
      )}
    </>
  );
};

export default GuestsTable;

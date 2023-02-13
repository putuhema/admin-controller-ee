import * as AlertDialog from "@radix-ui/react-alert-dialog";
import axios from "axios";
import { FormEvent, useState } from "react";
import { BiTrash } from "react-icons/bi";

const Alert = ({ id, fn }: { id: number; fn: (id: number) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: "/api/student-delete",
      data: { id },
    });

    setIsOpen(false);
  };

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Trigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 px-4 rounded bg-red-300  hover:bg-red-400"
        >
          <BiTrash />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-white/30 backdrop-blur-sm overlay" />
        <AlertDialog.Content className="p-4 bg-white border rounded-md shadow-sm fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 content">
          <AlertDialog.Title>
            Yakin ingin menghapus data siswa ?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-neutral-400">
            Tindakan ini tidak bisa diulang. <br /> menghapus akan mengakibatkan
            data terhapus dari database
          </AlertDialog.Description>
          <div className="flex gap-4 mt-4 flex-end">
            <AlertDialog.Cancel asChild>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-neutral-200 border-2 text-neutral-400 p-2 rounded-md"
              >
                cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <form
                action="/api/student-delete"
                method="delete"
                onSubmit={(e) => handleOnSubmit(e)}
              >
                <input type="hidden" name="id" id="id" value={id} />
                <button
                  type="submit"
                  className="bg-red-100 text-red-400 hover:bg-red-200 p-2 rounded-md "
                >
                  iya, hapus data siswa
                </button>
              </form>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
        =
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Alert;

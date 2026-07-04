"use client";

import ButtonIcon from "@/components/ui/button-icon";
import { FormMessage } from "@/components/ui/form/message";
import ModalConfirm from "@/components/ui/modal-confirm";
import { deleteUser } from "@/data/user";
import { theme } from "@/lib/theme";
import { TGetUsers } from "@/lib/types";
import { Info, Pen, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface UsersAdminPageProps {
  dataUsers: TGetUsers;
}

const UsersAdminPage = ({ dataUsers }: UsersAdminPageProps) => {
  const [message, setMessage] = useState<string>("");
  const [daftarUsers, setDaftarUsers] = useState(
    dataUsers?.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })) || []
  );

  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState({
    id: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredData = useMemo(() => {
    let filtered = daftarUsers;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    return filtered;
  }, [daftarUsers, searchTerm, roleFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
  };

  const uniqueRole = [...new Set(daftarUsers.map((p) => p.role))];

  const handleDeleteuser = async (id: string) => {
    setLoading(true);
    await deleteUser(id)
      .then((res) => {
        if (res.error) {
          setMessage(res.error);
        } else if (res.success) {
          setMessage(res.success);
          setDaftarUsers(daftarUsers.filter((item) => item.id !== id));
        }
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setModalDeleteOpen(false);
        setLoading(false);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };

  return (
    <div className="lg:ml-64">
      <div className="p-6">
        <div className="mb-6">
          <h1 className={`text-2xl font-bold ${theme.text_title} mb-2`}>Data user</h1>
          <p className={`${theme.text_default_light}`}>
            Menampilkan {filteredData.length} dari {daftarUsers.length} data
          </p>
        </div>

        <div className={`mb-6 space-y-4`}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`${theme.icon_search}`}/>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan ID, nama, email, role ..."
              className={`${theme.highlight_search}`}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className={`block text-sm font-medium  mb-2 ${theme.text_default}`}>
                Filter Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`${theme.highlight_filter}`}
              >
                <option value="all">Semua Role</option>
                {uniqueRole.map((status) => (
                  <option key={status} value={status as string}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2.5">
              <button
                onClick={clearFilters}
                className={`${theme.button_reset}`}
              >
                <RefreshCw size={16} />
                Reset
              </button>
              <Link
                href="/admin/users/add"
                className={`${theme.button_add}`}
              >
                <Plus size={16} />
                Tambah
              </Link>
            </div>
          </div>

          {(searchTerm || roleFilter !== "all") && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className={` ${theme.background_result_filter}`}>
                  Search: &quot;{searchTerm}&quot;
                </span>
              )}
              {roleFilter !== "all" && (
                <span 
                  className={`${theme.background_result_filter}`}>
                  Role: {roleFilter}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          {message && (
            <FormMessage message={message} className="mb-4" type="warning" />
          )}
          <table className="w-full table-auto text-sm text-center ">
            <thead className={`${theme.table_header} text-white`}>
              <tr>
                <th className="px-6 py-4">Nama & ID</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b ${theme.text_default} ${theme.border_table_default} ${theme.table_highlight}`}
                  >
                    <td className={`px-6 py-4 font-medium text-left`}>
                      <div>{user.name}</div>
                      <div className={`text-sm ${theme.text_default_light} text-left`}>
                        {user.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center  gap-6">
                        <Link href={`/admin/users/detail/${user.id}`}>
                          <ButtonIcon
                            title="Detail"
                            className="hover:text-yellow-400"
                            icon={<Info size={18} />}
                          />
                        </Link>
                        <Link href={`/admin/users/edit/${user.id}`}>
                          <ButtonIcon
                            title="Edit"
                            className="hover:text-blue-400"
                            icon={<Pen size={18} />}
                          />
                        </Link>
                        <ButtonIcon
                          title="Hapus"
                          className="hover:text-red-500"
                          onClick={() => {
                            setModalDeleteOpen(true);
                            setSelectedField({
                              id: user.id,
                              name: user.name || "",
                            });
                          }}
                          icon={<Trash2 size={18} />}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className={`px-6 py-4 text-center ${theme.text_default_light}`}
                  >
                    {daftarUsers.length === 0
                      ? "Tidak ada data"
                      : "Tidak ada data yang sesuai dengan filter"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ModalConfirm
        handleClose={() => setModalDeleteOpen(false)}
        handleConfirm={() => handleDeleteuser(selectedField.id)}
        isOpen={modalDeleteOpen}
        loading={loading}
        title="Kill user Ini"
        message={`Apakah Anda yakin ingin mengkill ${selectedField.name}?`}
      />
    </div>
  );
};

export default UsersAdminPage;

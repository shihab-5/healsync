"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, Button, Chip, Avatar } from "@heroui/react";
import { Magnifier, TrashBin, CirclePause, CirclePlay, Person } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { getUsers, updateUserStatus, deleteUser } from "@/app/lib/action/user";

const ROLE_FILTERS = ["all", "patient", "doctor", "admin"];

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [actingId, setActingId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUsers();
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to load users:", err);
        toast.error("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statusOf = (u) => u.status || "active";

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      const matchesSearch =
        !search.trim() ||
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase());
      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, search]);

  const handleSuspendToggle = async (u) => {
    const isSuspended = statusOf(u) === "suspended";
    const newStatus = isSuspended ? "active" : "suspended";

    if (!isSuspended && !confirm(`Suspend ${u.name}? They won't be able to log in until reactivated.`)) {
      return;
    }

    setActingId(u._id || u.id);
    try {
      await updateUserStatus(u._id || u.id, newStatus);
      setUsers((prev) =>
        prev.map((p) => (p._id === u._id || p.id === u.id ? { ...p, status: newStatus } : p))
      );
      toast.success(isSuspended ? `${u.name} reactivated.` : `${u.name} suspended.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user status.");
    } finally {
      setActingId(null);
    }
  };

  const handleDelete = async (u) => {
    if (!confirm(`Permanently delete ${u.name}? This can't be undone.`)) return;

    setActingId(u._id || u.id);
    try {
      await deleteUser(u._id || u.id);
      setUsers((prev) => prev.filter((p) => (p._id || p.id) !== (u._id || u.id)));
      toast.success(`${u.name} deleted.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    } finally {
      setActingId(null);
    }
  };

  const roleColor = {
    admin: "accent",
    doctor: "success",
    patient: "default",
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
          Manage Users
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          View, suspend, or remove user accounts across the platform.
        </p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {ROLE_FILTERS.map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                roleFilter === r
                  ? "bg-teal-700 text-white"
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Magnifier size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 bg-white focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* User list */}
      {filteredUsers.length === 0 ? (
        <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto mb-3">
            <Person size={22} />
          </div>
          <p className="text-sm font-semibold text-slate-500">No users found</p>
          <p className="text-xs text-slate-400 mt-1">
            Try a different filter or search term.
          </p>
        </Card>
      ) : (
        <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/60">
                  <th className="py-3 px-5">User</th>
                  <th className="py-3 px-5">Role</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Joined</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const id = u._id || u.id;
                  const status = statusOf(u);
                  const isActing = actingId === id;

                  return (
                    <tr
                      key={id}
                      className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar
                            src={u.image || undefined}
                            name={u.name}
                            className="w-9 h-9 font-bold text-white bg-gradient-to-br from-teal-600 to-teal-400 rounded-lg shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-slate-800 truncate">
                              {u.name}
                            </span>
                            <span className="text-xs text-slate-400 font-medium truncate">
                              {u.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <Chip size="sm" variant="soft" color={roleColor[u.role] || "default"} className="capitalize font-bold">
                          {u.role}
                        </Chip>
                      </td>
                      <td className="py-3.5 px-5">
                        <Chip
                          size="sm"
                          variant="soft"
                          color={status === "suspended" ? "danger" : "success"}
                          className="capitalize font-bold"
                        >
                          {status}
                        </Chip>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-xs font-medium text-slate-500">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "—"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            isLoading={isActing}
                            isDisabled={u.role === "admin"}
                            onPress={() => handleSuspendToggle(u)}
                            className={`font-bold rounded-lg border ${
                              status === "suspended"
                                ? "text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                                : "text-amber-700 border-amber-200 hover:bg-amber-50"
                            }`}
                            startContent={
                              status === "suspended" ? <CirclePlay size={14} /> : <CirclePause size={14} />
                            }
                          >
                            {status === "suspended" ? "Reactivate" : "Suspend"}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            isLoading={isActing}
                            isDisabled={u.role === "admin"}
                            onPress={() => handleDelete(u)}
                            className="text-rose-600 hover:bg-rose-50 font-bold rounded-lg border border-rose-200"
                            startContent={<TrashBin size={14} />}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col divide-y divide-slate-50">
            {filteredUsers.map((u) => {
              const id = u._id || u.id;
              const status = statusOf(u);
              const isActing = actingId === id;

              return (
                <div key={id} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar
                      src={u.image || undefined}
                      name={u.name}
                      className="w-10 h-10 font-bold text-white bg-gradient-to-br from-teal-600 to-teal-400 rounded-lg shrink-0"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-bold text-slate-800 truncate">{u.name}</span>
                      <span className="text-xs text-slate-400 font-medium truncate">{u.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Chip size="sm" variant="soft" color={roleColor[u.role] || "default"} className="capitalize font-bold">
                      {u.role}
                    </Chip>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={status === "suspended" ? "danger" : "success"}
                      className="capitalize font-bold"
                    >
                      {status}
                    </Chip>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      isLoading={isActing}
                      isDisabled={u.role === "admin"}
                      onPress={() => handleSuspendToggle(u)}
                      className={`flex-1 font-bold rounded-lg border ${
                        status === "suspended"
                          ? "text-emerald-700 border-emerald-200"
                          : "text-amber-700 border-amber-200"
                      }`}
                    >
                      {status === "suspended" ? "Reactivate" : "Suspend"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      isLoading={isActing}
                      isDisabled={u.role === "admin"}
                      onPress={() => handleDelete(u)}
                      className="flex-1 text-rose-600 font-bold rounded-lg border border-rose-200"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
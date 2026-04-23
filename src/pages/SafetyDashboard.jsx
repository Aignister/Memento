import React, { useCallback, useState } from "react";
import { SquareStack, DoorOpen, ShieldAlert, Save, Trash2, } from "lucide-react";

import { useUsers } from "../hooks/useUsers";
import { USER_COLORS } from "../data/users";
import { MasterToggle } from "../components/MasterToggle";
import { LockControlCard } from "../components/LockControlCard";
import { SpeedSlider } from "../components/SpeedSlider";
import { HistoryPanel } from "../components/HistoryPanel";
import { UserSelector } from "../components/UserSelector";

// Controles de bloqueo
const LOCK_CONTROLS = [
  { key: "windows", title: "Ventanas bloqueadas", icon: SquareStack },
  { key: "doors", title: "Puertas bloqueadas", icon: DoorOpen    },
  { key: "seatbelt", title: "Cinturón obligatorio", icon: ShieldAlert },
];

// Toast
function useToast() {
  const [message, setMessage] = useState(null);
  const show = useCallback((msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2200);
  }, []);
  return { message, show };
}

// Pagina Principal
export function SafetyDashboard() {
  const {
    users, activeUser, activeUserId, selectUser,
    state,
    toggleMaster, toggleControl, setSpeedValue,
    snapshots, saveSnapshot, restoreSnapshot, deleteSnapshot, clearSnapshots,
  } = useUsers();

  const { message: toast, show: showToast } = useToast();

  const colors = USER_COLORS[activeUser.color];

  // Handlers
  const handleSave = useCallback(() => {
    saveSnapshot();
    showToast(`Configuración de ${activeUser.name} guardada`);
  }, [saveSnapshot, showToast, activeUser.name]);

  const handleRestore = useCallback(
    (id) => {
      const ok = restoreSnapshot(id);
      if (ok) showToast("Configuracion restaurada");
    },
    [restoreSnapshot, showToast]
  );

  const handleDelete = useCallback(
    (id) => { deleteSnapshot(id); showToast("Snapshot eliminado"); },
    [deleteSnapshot, showToast]
  );

  const handleClear = useCallback(() => {
    clearSnapshots(); showToast("Historial eliminado");
  }, [clearSnapshots, showToast]);

  const handleSelectUser = useCallback(
    (id) => {
      selectUser(id);
      const u = users.find((u) => u.id === id);
      showToast(`Perfil de ${u?.name} cargado`);
    },
    [selectUser, users, showToast]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-350 mx-auto px-6 h-14 flex items-center justify-center">
          <span className="text-[15px] font-medium text-gray-700 tracking-wide">
            Patrón de Memento
          </span>
        </div>
      </header>

      <main className="max-w-350 mx-auto w-full px-6 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_340px] gap-6 items-start">

          <aside className="flex flex-col gap-4 lg:sticky lg:top-18">
            <section className="bg-white border border-gray-100 rounded-2xl p-4">
              <p className="text-[11px] font-medium uppercase tracking-widest text-gray-300 mb-3">
                Vehículo
              </p>
              {/* Placeholder para vehiculo.png */}
              <div className="w-full flex items-center justify-center rounded-xl overflow-hidden bg-gray-50 border border-dashed border-gray-200" style={{ minHeight: 120 }}>
                <img
                  src="../images/Carro.png"
                  alt="Vehículo"
                  className="w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              </div>
            </section>
            <section className="bg-white border border-gray-100 rounded-2xl p-4">
              <p className="text-[11px] font-medium uppercase tracking-widest text-gray-300 mb-3">
                Usuarios
              </p>
              <UserSelector
                users={users}
                activeUserId={activeUserId}
                onSelect={handleSelectUser}
              />
            </section>

          </aside>

          <div className="flex flex-col gap-5">
            <section className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-gray-300 mb-3">
                Control principal · {activeUser.name}
              </p>
              <MasterToggle masterOn={state.masterOn} onToggle={toggleMaster} />
            </section>
            <section className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-gray-300 mb-3">
                Controles de bloqueo
              </p>
              <div className="flex flex-col gap-2">
                {LOCK_CONTROLS.map(({ key, title, icon }) => (
                  <LockControlCard
                    key={key}
                    icon={icon}
                    title={title}
                    enabled={state[key]}
                    disabled={!state.masterOn}
                    onToggle={() => toggleControl(key)}
                  />
                ))}
              </div>
            </section>
            <section className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-gray-300 mb-3">
                Limite de velocidad
              </p>
              <SpeedSlider
                enabled={state.speed}
                disabled={!state.masterOn}
                speedValue={state.speedValue}
                onToggle={() => toggleControl("speed")}
                onSpeedChange={setSpeedValue}
              />
            </section>
          </div>

          <aside className="bg-white border border-gray-100 rounded-2xl p-5 lg:sticky lg:top-18">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium
                               shrink-0 ${colors.bg} ${colors.text}`}>
                {activeUser.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-gray-700 leading-tight">{activeUser.name}</p>
                <p className="text-[11px] text-gray-400">{activeUser.description}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${colors.badge} border ${colors.border}`}>
                activo
              </span>
            </div>

            <HistoryPanel
              snapshots={snapshots}
              onSave={handleSave}
              onRestore={handleRestore}
              onDelete={handleDelete}
              onClear={handleClear}
            />
          </aside>

        </div>
      </main>

      <footer className="border-t border-gray-100 bg-white mt-auto">
        <div className="max-w-350 mx-auto px-6 h-11 flex items-center justify-between">
          <p className="text-xs text-gray-300">SafeKids · Patrón de diseño Memento</p>
          <p className="text-xs text-gray-300">React + Tailwind CSS</p>
        </div>
      </footer>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm
                        px-4 py-2 rounded-lg pointer-events-none animate-fade-in whitespace-nowrap z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
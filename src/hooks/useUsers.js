import { useState, useCallback, useRef } from "react";
import { SafetyConfig } from "../patterns/SafetyOriginator";
import { SafetyCaretaker } from "../patterns/SafetyCaretaker";
import { DEFAULT_USERS } from "../data/users";

export function useUsers() {
  // Inicializa un mapa de los Originators y Caretakers por el userId
  const configsRef = useRef(null);
  const caretakersRef = useRef(
    Object.fromEntries(
      DEFAULT_USERS.map((u) => [u.id, new SafetyCaretaker(20)])
    )
  );

  if (configsRef.current === null) {
    configsRef.current = Object.fromEntries(
      DEFAULT_USERS.map((u) => [u.id, new SafetyConfig(u.preset)])
    );
  }

  const [activeUserId, setActiveUserId] = useState(DEFAULT_USERS[0].id);

  const [configStates, setConfigStates] = useState(() =>
    Object.fromEntries(
      DEFAULT_USERS.map((u) => [u.id, new SafetyConfig(u.preset).getState()])
    )
  );

  // Snapshots del historial por userId
  const [snapshotMap, setSnapshotMap] = useState(() =>
    Object.fromEntries(DEFAULT_USERS.map((u) => [u.id, []]))
  );

  const syncConfig = useCallback((userId) => {
    setConfigStates((prev) => ({
      ...prev,
      [userId]: configsRef.current[userId].getState(),
    }));
  }, []);

  const syncSnapshots = useCallback((userId) => {
    setSnapshotMap((prev) => ({
      ...prev,
      [userId]: caretakersRef.current[userId].getAll(),
    }));
  }, []);

  // Seleccion de usuario
  const selectUser = useCallback((userId) => {
    setActiveUserId(userId);
  }, []);

  // Acciones de configuracion (Estas operan sobre el usuario que se encuentre activo)
  const toggleMaster = useCallback(() => {
    const cfg = configsRef.current[activeUserId];
    cfg.setMaster(!cfg.get("masterOn"));
    syncConfig(activeUserId);
  }, [activeUserId, syncConfig]);

  const toggleControl = useCallback(
    (key) => {
      configsRef.current[activeUserId].toggle(key);
      syncConfig(activeUserId);
    },
    [activeUserId, syncConfig]
  );

  const setSpeedValue = useCallback(
    (value) => {
      configsRef.current[activeUserId].setSpeedValue(value);
      syncConfig(activeUserId);
    },
    [activeUserId, syncConfig]
  );

  // Acciones del patron de Memento
  const saveSnapshot = useCallback(() => {
    const memento = configsRef.current[activeUserId].save();
    caretakersRef.current[activeUserId].push(memento);
    syncSnapshots(activeUserId);
    return memento;
  }, [activeUserId, syncSnapshots]);

  const restoreSnapshot = useCallback(
    (id) => {
      const memento = caretakersRef.current[activeUserId].getById(id);
      if (!memento) return false;
      configsRef.current[activeUserId].restore(memento);
      syncConfig(activeUserId);
      return true;
    },
    [activeUserId, syncConfig]
  );

  const deleteSnapshot = useCallback(
    (id) => {
      caretakersRef.current[activeUserId].remove(id);
      syncSnapshots(activeUserId);
    },
    [activeUserId, syncSnapshots]
  );

  const clearSnapshots = useCallback(() => {
    caretakersRef.current[activeUserId].clear();
    syncSnapshots(activeUserId);
  }, [activeUserId, syncSnapshots]);

  // Datos del usuario activo
  const activeUser   = DEFAULT_USERS.find((u) => u.id === activeUserId);
  const activeState  = configStates[activeUserId];
  const activeSnaps  = snapshotMap[activeUserId];

  return {
    // Usuarios
    users: DEFAULT_USERS,
    activeUser,
    activeUserId,
    selectUser,
    // Configuracion del usuario activo
    state: activeState,
    toggleMaster,
    toggleControl,
    setSpeedValue,
    // Historial del usuario activo
    snapshots: activeSnaps,
    saveSnapshot,
    restoreSnapshot,
    deleteSnapshot,
    clearSnapshots,
  };
}
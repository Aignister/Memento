import { USER_COLORS } from "../data/users";

export function UserSelector({ users, activeUserId, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => {
        const isActive = user.id === activeUserId;
        const colors   = USER_COLORS[user.color];

        return (
          <button
            key={user.id}
            onClick={() => onSelect(user.id)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left
              transition-all duration-150 select-none
              ${
                isActive
                  ? `${colors.bg} ${colors.border} ring-1 ${colors.ring}`
                  : "bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200"
              }
            `}
          >

            <div
              className={`
                w-9 h-9 rounded-full flex items-center justify-center shrink-0
                text-[13px] font-medium transition-colors duration-150
                ${isActive ? `${colors.bg} ${colors.text}` : "bg-gray-100 text-gray-500"}
              `}
              style={{ border: isActive ? `2px solid` : "2px solid transparent",
                       borderColor: isActive ? "currentColor" : "transparent" }}
            >
              {user.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium leading-tight ${
                isActive ? colors.text : "text-gray-700"
              }`}>
                {user.name}
              </p>
            </div>

            {isActive && (
              <div className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
            )}
          </button>
        );
      })}
    </div>
  );
}
// import { ReactNode } from "react";
// import { LucideIcon } from "lucide-react";

// export interface Column<T> {
//   key: keyof T | string;
//   label: string;
//   width?: string;
//   align?: "left" | "center" | "right";
//   render?: (value: T[keyof T], item: T) => ReactNode;
// }

// export interface Action<T> {
//   label: string;
//   icon: LucideIcon;
//   onClick: (item: T) => void;
//   variant?: "default" | "danger" | "secondary";
//   show?: (item: T) => boolean;
// }

// interface TableProps<T> {
//   data: T[];
//   columns: Column<T>[];
//   keyField?: keyof T;
//   search?: string;
//   searchFields?: (keyof T)[];
//   searchFn?: (item: T, searchText: string) => boolean;
//   emptyMessage?: string;
//   onRowClick?: (item: T) => void;
//   rowClassName?: string;
//   actions?: Action<T>[];
//   showActionsColumn?: boolean;
// }

// const actionStyles = {
//   default: "text-black-700/50 hover:text-teal-700 hover:bg-teal-50",
//   danger: "text-black-700/50 hover:text-red-500 hover:bg-red-50",
//   secondary: "text-black-700/50 hover:text-blue-600 hover:bg-blue-50",
// };

// export function Table<T extends Record<string, any>>({
//   data,
//   columns,
//   keyField = "id" as keyof T,
//   search = "",
//   searchFields = [],
//   searchFn,
//   emptyMessage = "Nenhum resultado encontrado.",
//   onRowClick,
//   rowClassName = "",
//   actions = [],
//   showActionsColumn = true,
// }: TableProps<T>) {
//   const filtered = search
//     ? data.filter((item) => {
//         if (searchFn) {
//           return searchFn(item, search);
//         }
//         return searchFields.some((field) =>
//           String(item[field]).toLowerCase().includes(search.toLowerCase()),
//         );
//       })
//     : data;

//   const hasActions = actions.length > 0 && showActionsColumn;

//   return (
//     <div className="w-full">
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="bg-white-300 border-b border-white-700">
//             {columns.map((column) => (
//               <th
//                 key={String(column.key)}
//                 className={`px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-black-700/60 ${column.width || ""}`}
//                 style={{
//                   textAlign:
//                     column.align === "right"
//                       ? "right"
//                       : column.align === "center"
//                         ? "center"
//                         : "left",
//                 }}
//               >
//                 {column.label}
//               </th>
//             ))}
//             {hasActions && (
//               <th className="px-6 py-4 text-[11px] uppercase tracking-wider font-bold text-black-700/60 text-right">
//                 Ações
//               </th>
//             )}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-white-700">
//           {filtered.map((item) => (
//             <tr
//               key={String(item[keyField])}
//               onClick={() => onRowClick?.(item)}
//               className={`group hover:bg-teal-50/30 transition-colors ${onRowClick ? "cursor-pointer" : ""} ${rowClassName}`}
//             >
//               {columns.map((column) => (
//                 <td
//                   key={String(column.key)}
//                   className="px-6 py-4"
//                   style={{
//                     textAlign:
//                       column.align === "right"
//                         ? "right"
//                         : column.align === "center"
//                           ? "center"
//                           : "left",
//                   }}
//                 >
//                   {column.render
//                     ? column.render(item[column.key as keyof T], item)
//                     : String(item[column.key as keyof T ?? ""])}
//                 </td>
//               ))}
//               {hasActions && (
//                 <td className="px-6 py-4 text-right">
//                   <div className="flex items-center justify-end gap-1">
//                     {actions
//                       .filter((action) => !action.show || action.show(item))
//                       .map((action) => {
//                         const Icon = action.icon;
//                         const style = actionStyles[action.variant || "default"];

//                         return (
//                           <button
//                             key={action.label}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               action.onClick(item);
//                             }}
//                             className={`p-2 rounded-lg transition-all cursor-pointer ${style}`}
//                             title={action.label}
//                           >
//                             <Icon size={16} />
//                           </button>
//                         );
//                       })}
//                   </div>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {filtered.length === 0 && (
//         <div className="py-20 text-center text-black-700/50 text-sm">
//           {emptyMessage}
//         </div>
//       )}
//     </div>
//   );
// }

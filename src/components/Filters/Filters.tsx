import React from "react";
import styles from './Filters.module.scss';

interface FiltersProps {
  filterStatus: "all" | "completed" | "incomplete";
  setFilterStatus: (status: "all" | "completed" | "incomplete") => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filterStatus, setFilterStatus, searchText, setSearchText }) => {
    return (
      <div className={styles.filter_controls}>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as "all" | "completed" | "incomplete")}>
          <option value="all">Todas</option>
          <option value="completed">Concluídas</option>
          <option value="incomplete">Não Concluídas</option>
        </select>
  
        <input
          type="text"
          placeholder="Buscar tarefa..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    );
  };
  
  export default Filters;
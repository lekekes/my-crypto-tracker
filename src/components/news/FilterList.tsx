import { motion } from 'framer-motion';

interface FilterListProps {
  filters: string[];
  options: string[];
  toggleFilter: (filter: string) => void;
}

export default function FilterList({
  filters,
  options,
  toggleFilter,
}: FilterListProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {options.map((filter) => (
        <motion.div
          key={filter}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${
            filters.includes(filter)
              ? 'bg-yellow-400 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          onClick={() => toggleFilter(filter)}
        >
          {filter}
        </motion.div>
      ))}
    </div>
  );
}

import {
  Text,
  Table,
  Th,
  Tr,
  Thead,
  Tbody,
  TableCaption,
  Td,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import styles from "./style";

function MyTable({
  labels,
  data,
  columnsWidth,
  onRowClick = undefined,
  onCellsClick = [],
}) {
  onCellsClick = onCellsClick.sort(
    (firsElement, secondElement) =>
      firsElement.cellNumber - secondElement.cellNumber
  );

  return (
    <Table {...styles.table}>
      <Thead d="block">
        <Tr w="100%" d="inline-table">
          {labels.map((el, ind) => {
            return (
              <Th key={ind} {...styles.th(columnsWidth[ind])}>
                <Text {...styles.thText}>{el}</Text>
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody w="100%" d="inline-table">
        {data.map((row, index_row) => {
          let counter = 0;
          return (
            <Tr
              h="5vh"
              key={index_row}
              onClick={onRowClick ? () => onRowClick(index_row) : null}
            >
              {row.map((cell, index_cell) => {
                const clickEventToThisCell =
                  counter < onCellsClick.length &&
                  onCellsClick[counter].cellNumber === index_cell
                    ? onCellsClick[counter].callback
                    : undefined;
                if (clickEventToThisCell) counter += 1;
                return (
                  <Td
                    key={index_cell}
                    {...styles.td(
                      columnsWidth[index_cell],
                      !!clickEventToThisCell || !!onRowClick
                    )}
                    onClick={
                      clickEventToThisCell
                        ? () => clickEventToThisCell(index_row)
                        : undefined
                    }
                  >
                    <Text {...styles.tdText}>{cell}</Text>
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

MyTable.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    )
  ).isRequired,
  columnsWidth: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),

  onRowClick: PropTypes.func,
  onCellsClick: PropTypes.arrayOf(
    PropTypes.shape({ cellNumber: PropTypes.number, callback: PropTypes.func })
  ),
};

export default MyTable;

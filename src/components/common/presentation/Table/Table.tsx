import React, {FunctionComponent} from 'react'
import styled from 'styled-components'

export interface Column {
  label: string;
  key: string;
  align?: 'left' | 'center' | 'right';
}

interface TableHeadProps {
  columns: Array<Column>;
}

interface TableBodyProps {
  data: Array<Object>;
  columns: Array<Column>;
}

interface TableProps {
  data: Array<Object>;
  columns: Array<Column>;
}

const TableHead: FunctionComponent<TableHeadProps> = ({columns}) => {
  return (
    <TableHeadPresentation>
    {
      columns.map(({ label, align }) =>
        <TH style={{ textAlign: align || 'left' }}>
          {label}
        </TH>
      )
    }
    </TableHeadPresentation>
  )
}

const TableBody: FunctionComponent<TableBodyProps> = ({data, columns}) => {
  return (
    <tbody>
    {
      data.map((column) => (
        <TR>
          {columns.map(({ key, align }) => (
            <TD style={{ textAlign: align || 'left' }}>
              {(column as any)[key]}
            </TD>
            ))}
        </TR>
      ))
    }
    </tbody>
  )
}

const Table: FunctionComponent<TableProps> = ({data, columns}) => {
  return (
    <TablePresentation>
      <TableHead columns={columns} />
      <TableBody data={data} columns={columns} />
    </TablePresentation>
  )
}

export default Table

const TablePresentation = styled.table`
  width: 100%;
`

const TableHeadPresentation = styled.thead`
  background: ${({theme}) => theme.neutral900};
  border-radius: 5px;

  & th:first-child {
    border-top-left-radius: 10px;
  }

  & th:last-child {
    border-top-right-radius: 10px;
  }

  & th:first-child {
    border-bottom-left-radius: 10px;
  }

  & th:last-child {
    border-bottom-right-radius: 10px;
  }
`

const TH = styled.th`
  padding: 12px 16px;
  font-family: 'Lexend', sans-serif;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.neutral100};
`

const TD = styled.td`
  padding: 16px;
`

const TR = styled.tr`
  &:nth-child(2n) {
    background: ${({theme}) => theme.neutral900};
  }
`

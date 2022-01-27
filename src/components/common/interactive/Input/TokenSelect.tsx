import InputSelect, { SelectItemProps } from './InputSelect'

type Props = {
  list: SelectItemProps[]
  selectedValue: SelectItemProps
  onSelect: (value: SelectItemProps) => void
}

const TokenSelect = ({
  list = [],
  selectedValue = {} as SelectItemProps,
  onSelect = () => {}
}: Props) => {
  return (
    <InputSelect
      label='TOKEN'
      selectedItem={selectedValue}
      options={list}
      onSelect={onSelect}
      showIcons
    />
  )
}

export default TokenSelect

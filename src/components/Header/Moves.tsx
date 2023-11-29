type Props = {
  moves: number;
}

export const Moves: React.FC<Props> = ({ moves }) => {
  return (
    <div>
      Moves:
      {' '}
      <span className='Header__count'>
        {moves}
      </span>
    </div>
  )
};

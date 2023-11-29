type Props = {
  time: number;
}

export const Time: React.FC<Props> = ({ time }) => {
  return (
    <div>
      Time:
      {' '}
      <span className='Header__count'>
        {time}s
      </span>
    </div>
  )
};

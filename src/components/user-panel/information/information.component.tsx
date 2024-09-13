interface InfoProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export default function Information(props: InfoProps) {
  return (
    <div className='mx-5 my-4 flex flex-row'>
      {props.icon}
      <div className='mr-2 text-right'>
        <p>{props.title}</p>
        <p>{props.value}</p>
      </div>
    </div>
  );
}

interface FoodGridProps {
  foods: React.ReactNode
}
export default function FoodGrid(props : FoodGridProps) {
  return (
    <div className='mt-4 mx-5 grid grid-cols-2 gap-7 items-center text-center'>
      {props.foods}
    </div>
  );
}

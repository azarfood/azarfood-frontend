interface RestaurantGridProps {
  restaurants: React.ReactNode
}
export default function RestaurantGrid(props: RestaurantGridProps) {
  return (
    <div className='mx-5 mt-4 grid grid-cols-2 items-center gap-x-9 gap-y-6 text-center'>
      {props.restaurants}
    </div>
  );
}

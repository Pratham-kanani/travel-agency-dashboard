import { allTrips, dashboardStats, user } from "~/constants";
import { Header, StatsCard, TripCard } from "../../../components"
import { getUser } from "~/appwrite/auth";
import type { Route } from "./+types/admin-layout";

//Destructuring to avoid writind dashboardStats everytime
const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

export const clientLoader = async () => await getUser();


const Dashboard = ({ loaderData } : Route.ComponentProps) => {
  const user = loaderData as unknown as User | null;

  return (
    <main className="dashboard wrapper">
      <Header 
        title={`Welcome ${user?.name ?? 'Guest'}  `}
        description="Track activity, trends and popular destinations in real time"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 mid:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle = "Total Users"
            total = {totalUsers}
            currentMonthCount = {usersJoined.currentMonth}
            lastMonthCount = {usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle = "Total Trips"
            total = {totalTrips}
            currentMonthCount = {tripsCreated.currentMonth}
            lastMonthCount = {tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle = "Active Users Today"
            total = {userRole.total}
            currentMonthCount = {userRole.currentMonth}
            lastMonthCount = {userRole.lastMonth}
          />
        </div>
      </section>

      <section className="container">
        <h1 className="text--xl font-semibold text-dark-100">Created Trips</h1>
        
        <div className="trip-grid">
          {allTrips.slice(0, 4).map(({ id, name, imageUrls, itinerary, tags, travelStyle, estimatedPrice }) => (
            <TripCard
              key={id}
              id={id.toString()}
              name={name}
              imageUrl={imageUrls[0]}
              location={itinerary?.[0]?.location ?? ''}
              tags={tags}
              price={estimatedPrice}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Dashboard

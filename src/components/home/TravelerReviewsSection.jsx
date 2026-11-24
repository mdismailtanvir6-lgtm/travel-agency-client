import { getReviews } from "@/lib/reviews";
import TravelerReviews from "./TravelerReviews";

export default async function TravelerReviewsSection() {
  const reviews = await getReviews();

  return <TravelerReviews reviews={reviews} />;
}

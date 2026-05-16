import { client } from "@/sanity/lib/client";
import ResourceArchive from "@/components/resources/ResourceArchive";

const RESOURCES_QUERY = `*[_type == "resource" && published == true]{
  _id,
  title,
  author,
  year,
  type,
  description,
  url,
  tags
} | order(year desc)`;

export default async function ResourcesPage() {
  const resources = await client.fetch(RESOURCES_QUERY);
  return <ResourceArchive initialResources={resources} />;
}
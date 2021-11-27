const baseUrl = "/api/projects";

export function createFetchProjectsRequest(id?: number): PortfolioAPIRequest {
  return {
    method: "GET",
    url: `${baseUrl}${id ? `?id=${id}` : ""}`,
  };
}

export function createProjectRequest(
  name: string,
  description: string,
  content: string,
  date: Date,
  projectImages: { imageId: number; priority: number }[],
  projectVideos: { videoId: number; priority: number }[]
): PortfolioAPIRequest {
  return {
    method: "PUT",
    url: baseUrl,
    body: { name, description, content, date, projectImages, projectVideos },
  };
}

export function createUpdateProjectRequest(
  id: number,
  name: string,
  description: string,
  content: string,
  date: Date,
  projectImages: { id?: number; imageId?: number; priority: number }[],
  projectVideos: { id?: number; videoId?: number; priority: number }[]
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUrl,
    body: {
      id,
      name,
      description,
      content,
      date,
      projectImages,
      projectVideos,
    },
  };
}

export function createDeleteProjectRequest(id: number): PortfolioAPIRequest {
  return {
    method: "DELETE",
    url: baseUrl,
    body: { id },
  };
}

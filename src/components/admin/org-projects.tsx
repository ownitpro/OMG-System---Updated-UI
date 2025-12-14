import React from "react";
interface Organization {
  projects: Array<{
    id: string;
    name: string;
    status: string;
    tasks: Array<{
      id: string;
      title: string;
      status: string;
    }>;
  }>;
}

interface OrgProjectsProps {
  org: Organization;
}

export function OrgProjects({ org }: OrgProjectsProps) {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Projects</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage projects and tasks for this organization
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {org.projects.map((project) => (
            <li key={project.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">{project.name}</p>
                    <p className="text-sm text-gray-500">
                      {project.tasks.length} tasks
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {project.status}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

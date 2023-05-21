import { ref } from 'vue';

const projects = ref([]);

export function useProjectStore() {
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/project/');
      const data = await response.json();
      projects.value = data;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const createProject = async (projectData) => {
    try {
      const response = await fetch('http://localhost:3000/api/project/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      const data = await response.json();
      projects.value.push(data);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/project/update/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
      const data = await response.json();
      const index = projects.value.findIndex((p) => p.id === projectId);
      if (index !== -1) {
        projects.value[index] = data;
      }
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/delete/projects/${id}`, {
        method: 'DELETE',
      });
      projects.value = projects.value.filter((project) => project.id !== id);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

//   const deleteProject = async (projectId) => {
//     try {
//       await fetch(`http://localhost:3000/api/project/${id}`, {
//         method: 'DELETE',
//       });
//       projects.value = projects.value.filter((p) => p.id !== projectId);
//     } catch (error) {
//       console.error('Failed to delete project:', error);
//     }
//   };

//   const deleteProject = async (projectId) => {
//     try {
//       await fetch(`http://localhost:3000/api/project/${id}`, {
//         method: 'DELETE',
//       });
//       projects.value = projects.value.filter((p) => p.id !== projectId);
//     } catch (error) {
//       console.error('Failed to delete project:', error);
//     }
//   };

  return {
    projects,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}

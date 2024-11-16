const username = "aaqidmasoodi";
const repoList = document.getElementById("repoList");

 
 const allowedRepos = ["A-Star-Python", "ancientbrainplusplus"];


 export async function fetchRepos() {
     try {
         const response = await fetch(`https://api.github.com/users/${username}/repos`);
         const repos = await response.json();


         if (!Array.isArray(repos)) {
             repoList.innerHTML = "<li>Error fetching repositories.</li>";
             return;
         }


         const filteredRepos = repos.filter(repo => allowedRepos.includes(repo.name));


         repoList.innerHTML = "";


         filteredRepos.forEach((repo) => {
             const listItem = document.createElement("li");
             listItem.innerHTML = `
                 <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                 <p>${repo.description || "No description available."}</p>
             `;
             repoList.appendChild(listItem);
         });


         if (filteredRepos.length === 0) {
             repoList.innerHTML = "<li>No matching repositories found.</li>";
         }

     } catch (error) {
         console.error("Error fetching GitHub repos:", error);
         repoList.innerHTML = "<li>Failed to load repositories.</li>";
     }
 }
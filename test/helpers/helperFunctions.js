export function getNextPage(linksHeader = '') {
   const links = linksHeader.split(/\s*,\s*/); // splits and strips the urls
   return links.reduce(function(nextUrl, link) {
      if (link.search(/rel="next"/) !== -1) {
         return (link.match(/<(.*)>/) || [])[1];
      }

      return nextUrl;
   }, undefined);
}

export function deleteRepo(repo, WiPubSub) {
   return WiPubSub
         .getRepo(repo.owner.login, repo.name)
         .deleteRepo()
         .then((removed) => {
            if (removed) {
              console.log(repo.full_name, 'deleted'); // eslint-disable-line
            }
         });
}

export function deleteTeam(team, WiPubSub) {
   return WiPubSub
         .getTeam(team.id)
         .deleteTeam()
         .then((removed) => {
            if (removed) {
              console.log('team', team.name, 'deleted'); //eslint-disable-line
            }
         });
}

export function deleteProject(project, WiPubSub) {
   return WiPubSub
         .getProject(project.id)
         .deleteProject()
         .then((removed) => {
            if (removed) {
              console.log('project', project.name, 'deleted'); //eslint-disable-line
            }
         });
}

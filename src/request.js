export default async function githubGQL(query, variables = {}, token) {
  const body = JSON.stringify({
    query,
    variables,
    operationName: null
  });
  const res = await fetch('https://api.github.com/graphql', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    method: "POST",
    body
  });
  const json = await res.json();

  return json;
}

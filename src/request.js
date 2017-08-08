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
  const { data, errors } = await res.json();

  if (errors) {
    throw new Error(JSON.stringify(errors));
  }

  return data;
}

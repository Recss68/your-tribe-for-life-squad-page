const FALLBACK_BIO = `Ik moet echt tering nodig poepen. Maar ik ben te lui om naar het toilet te lopen, dus ik hou het nog even op.`;

export async function load({ params, fetch }) {
  const { id } = params;

  // Fetch in parallel
  const [memberResponse, listResponse] = await Promise.all([
    fetch(`https://fdnd.directus.app/items/person/${id}`),
    fetch(
      "https://fdnd.directus.app/items/person" +
        "?fields=*,squads.squad_id.name,squads.squad_id.cohort,squads.squad_id.tribe.name" +
        "&filter[squads][squad_id][cohort][_eq]=2526" +
        "&filter[squads][squad_id][tribe][name][_eq]=FDND%20Jaar%202"
    ),
  ]);

  if (!memberResponse.ok) {
    throw new Error("Kon persoon niet ophalen");
  }
  if (!listResponse.ok) {
    throw new Error("Kon ledenlijst niet ophalen");
  }

  const memberJson = await memberResponse.json();
  const listJson = await listResponse.json();

  const member = memberJson?.data ?? {};
  const members = Array.isArray(listJson?.data) ? listJson.data : [];

  const idx = members.findIndex((m) => String(m.id) === String(member.id));
  const prevId = idx > 0 ? members[idx - 1].id : null;
  const nextId = idx !== -1 && idx < members.length - 1 ? members[idx + 1].id : null;

  const bio = member.bio || FALLBACK_BIO;

  return { member, members, prevId, nextId, bio };
}

import {fetchAPI} from '../../../lib/api';

export default async (req, res) => {
    const {query: {slug}} = req;
    const uri = slug.join('/');

    const data = await fetchAPI(
        `
            query getPage($id: ID!) {
                page(id: $id, idType: URI) {
                    title
                    content
                }
            }
        `, {
            variables: {id: uri}
        }
    )

    res.json(data.page);
}

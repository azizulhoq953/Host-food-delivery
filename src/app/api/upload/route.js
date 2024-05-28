export async function POST() {
    const data = await req.formData();
    if (data.get('file')){
        
    }
    return Response.json(true);
}
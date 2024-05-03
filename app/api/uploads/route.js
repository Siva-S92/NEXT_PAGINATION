export async function POST(request) {
    try {
      connectMongoDB();
      const postData = await request.json();
      const products = await Product.create(postData);
      return NextResponse.json(
        {
          success: true,
          message: "created the products in Product Table",
          data: products,
        },
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
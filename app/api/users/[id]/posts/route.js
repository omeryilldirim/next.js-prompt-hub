import Prompt from "/models/prompt";
import User from "/models/user";
import { connectToDB } from "/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
  } catch (err) {
    console.log(err);
  }
  try {
    const { id } = params;
    const prompts = await Prompt.find({
      creator: id,
    })
      .populate("creator")
      .sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({
        prompts,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(err, {
      status: 500,
    });
  }
};

/** This file was autogenerated. Follow the steps in src/schema/slack/functions/README.md to rebuild **/
import { assertEquals, assertExists } from "../../../dev_deps.ts";
import { DefineWorkflow } from "../../../workflows/mod.ts";
import { ManifestFunctionSchema } from "../../../manifest/manifest_schema.ts";
import SchemaTypes from "../../schema_types.ts";
import SlackTypes from "../schema_types.ts";
import CreateChannel from "./create_channel.ts";

Deno.test("CreateChannel generates valid FunctionManifest", () => {
  assertEquals(
    CreateChannel.definition.callback_id,
    "slack#/functions/create_channel",
  );
  const expected: ManifestFunctionSchema = {
    source_file: "",
    title: "Create a channel",
    description: "Create a Slack channel",
    input_parameters: {
      properties: {
        channel_name: {
          type: SchemaTypes.string,
          description: "Enter a channel name",
          title: "Channel name",
        },
        // ignore any additions of a `user_ids` parameter for now as there is debate on the naming.
        // we hope to settle on `manager_ids` in an upcoming release.
        is_private: {
          type: SchemaTypes.boolean,
          description: "Make this channel private",
          title: "Make channel private",
        },
      },
      required: ["channel_name"],
    },
    output_parameters: {
      properties: {
        channel_id: {
          type: SlackTypes.channel_id,
          description: "Channel name",
          title: "Channel name",
        },
        // ignore any additions of a `user_ids` parameter for now as there is debate on the naming.
        // we hope to settle on `manager_ids` in an upcoming release.
      },
      required: ["channel_id"],
    },
  };
  const actual = CreateChannel.export();

  assertEquals(actual, expected);
});

Deno.test("CreateChannel can be used as a Slack function in a workflow step", () => {
  const testWorkflow = DefineWorkflow({
    callback_id: "test_CreateChannel_slack_function",
    title: "Test CreateChannel",
    description: "This is a generated test to test CreateChannel",
  });
  testWorkflow.addStep(CreateChannel, { channel_name: "test" });
  const actual = testWorkflow.steps[0].export();

  assertEquals(actual.function_id, "slack#/functions/create_channel");
  assertEquals(actual.inputs, { channel_name: "test" });
});

Deno.test("All outputs of Slack function CreateChannel should exist", () => {
  const testWorkflow = DefineWorkflow({
    callback_id: "test_CreateChannel_slack_function",
    title: "Test CreateChannel",
    description: "This is a generated test to test CreateChannel",
  });
  const step = testWorkflow.addStep(CreateChannel, { channel_name: "test" });
  assertExists(step.outputs.channel_id);
});

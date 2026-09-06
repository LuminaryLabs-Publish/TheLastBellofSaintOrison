import { createOwnerKit } from "../owner-kit.js";
import { manifest } from "./manifest.js";
import { initialState } from "./state.js";
import { validateState } from "./validation.js";
import { operations as dialogue } from "./kits/dialogue-kit/operations.js";
import { operations as story_choice } from "./kits/story-choice-kit/operations.js";
import { operations as relationship } from "./kits/relationship-kit/operations.js";
import { createServiceKit as dialogueKit } from "./kits/dialogue-kit/index.js";
import { createServiceKit as story_choiceKit } from "./kits/story-choice-kit/index.js";
import { createServiceKit as relationshipKit } from "./kits/relationship-kit/index.js";
export function createDomainKit() {
  return createOwnerKit({
    manifest,
    initial: initialState,
    validate: validateState,
    operations: {
      ...Object.fromEntries(
        Object.entries(dialogue).map(([k, v]) => ["dialogue." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(story_choice).map(([k, v]) => ["story-choice." + k, v]),
      ),
      ...Object.fromEntries(
        Object.entries(relationship).map(([k, v]) => ["relationship." + k, v]),
      ),
    },
  });
}
export function createDomainKits() {
  return [
    createDomainKit(),
    dialogueKit(),
    story_choiceKit(),
    relationshipKit(),
  ];
}

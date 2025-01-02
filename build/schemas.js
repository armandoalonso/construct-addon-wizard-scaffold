import Joi from "joi";

// Define the paramSchema
const paramSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid(
      "string",
      "number",
      "any",
      "boolean",
      "combo",
      "cmp",
      "object",
      "objectname",
      "layer",
      "layout",
      "keyb",
      "instancevar",
      "instancevarbool",
      "eventvar",
      "eventvarbool",
      "animation",
      "objinstancevar"
    ),
})
  .when(Joi.object({ type: Joi.string().valid("combo") }).unknown(), {
    then: Joi.object({
      items: Joi.array()
        .items(Joi.object().length(1).pattern(Joi.string(), Joi.string()))
        .required(),
    }),
  })
  .when(Joi.object({ type: Joi.string().valid("object") }).unknown(), {
    then: Joi.object({
      allowedPluginIds: Joi.array().items(Joi.string()).required(),
    }),
  })
  .when(
    Joi.object({
      type: Joi.string().valid("number", "string", "any", "boolean", "combo"),
    }).unknown(),
    {
      then: Joi.object({
        initialValue: Joi.string().required().allow(""),
      }),
    }
  );

// Define the common schema
const commonSchema = {
  highlight: Joi.boolean().default(false),
  deprecated: Joi.boolean().default(false),
  listName: Joi.string().required(),
  displayText: Joi.string().required(),
  description: Joi.string().required().allow(""),
  params: Joi.array().items(paramSchema).default([]),
};

// Define the actionSchema
const actionSchema = Joi.object({
  ...commonSchema,
  isAsync: Joi.boolean().default(false),
});

// Define the conditionSchema
const conditionSchema = Joi.object({
  ...commonSchema,
  isTrigger: Joi.boolean().default(false),
  isFakeTrigger: Joi.boolean().default(false),
  isStatic: Joi.boolean().default(false),
  isLooping: Joi.boolean().default(false),
  isInvertible: Joi.boolean().default(true),
  isCompatibleWithTriggers: Joi.boolean().default(true),
});

const expressionParamSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.string().required(),
  type: Joi.string().required().valid("number", "string", "any"),
});

const expressionSchema = Joi.object({
  highlight: Joi.boolean().default(false),
  deprecated: Joi.boolean().default(false),
  returnType: Joi.string().required().valid("number", "string", "any"),
  isVariadicParameters: Joi.boolean().default(false),
  description: Joi.string().required().allow(""),
  params: Joi.array().items(expressionParamSchema).default([]),
});

const propertySchema = Joi.object({
  type: Joi.string()
    .valid(
      "integer",
      "float",
      "percent",
      "text",
      "longtext",
      "check",
      "font",
      "combo",
      "color",
      "object",
      "group",
      "link",
      "info"
    )
    .required(),

  id: Joi.string().required(),
  name: Joi.string().required(),
  desc: Joi.string().required(),

  options: Joi.object({
    initialValue: Joi.alternatives()
      .try(Joi.number(), Joi.string(), Joi.boolean())
      .optional(),
  })
    .required()
    .when(Joi.object({ type: Joi.string().valid("combo") }).unknown(), {
      then: Joi.object({
        initialValue: Joi.string().required(),
        items: Joi.array().items(Joi.object().length(1)).required(),
      }),
    })
    .when(
      Joi.object({
        type: Joi.string().valid("integer", "float", "percent"),
      }).unknown(),
      {
        then: Joi.object({
          initialValue: Joi.number().required(),
          minValue: Joi.number().optional(),
          maxValue: Joi.number().optional(),
          dragSpeedMultiplier: Joi.number().optional(),
        }),
      }
    )
    .when(Joi.object({ type: Joi.string().valid("object") }).unknown(), {
      then: Joi.object({
        allowedPluginIds: Joi.array().items(Joi.string()).required(),
      }),
    })
    .when(Joi.object({ type: Joi.string().valid("color") }).unknown(), {
      then: Joi.object({
        initialValue: Joi.array()
          .required()
          .length(3)
          .items(Joi.number().min(0).max(1)),
      }),
    })
    .when(Joi.object({ type: Joi.string().valid("link") }).unknown(), {
      then: Joi.object({
        linkCallback: Joi.function().required(),
        linkText: Joi.string().required(),
        callbackType: Joi.string()
          .required()
          .valid("for-each-instance", "once-for-type"),
      }),
    })
    .when(Joi.object({ type: Joi.string().valid("info") }).unknown(), {
      then: Joi.object({
        infoCallback: Joi.function().required(),
      }),
    })
    .when(
      Joi.object({
        type: Joi.string().valid(
          "integer",
          "float",
          "percent",
          "text",
          "longtext",
          "check",
          "combo",
          "color"
        ),
      }).unknown(),
      {
        then: Joi.object({
          interpolatable: Joi.boolean().default(false),
        }),
      }
    ),
});

const configSchema = Joi.object({
  addonType: Joi.string().valid("plugin", "behavior", "effect").required(),
  type: Joi.string().valid("world", "object", "dom").required(),
  id: Joi.string().token().required(),
  name: Joi.string().required(),
  version: Joi.string()
    .regex(/\d+\.\d+\.\d+\.\d+/)
    .required(),
  author: Joi.string().required(),
  website: Joi.string().required(),
  documentation: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .required()
    .valid(
      "general",
      "3d",
      "data-and-storage",
      "form-controls",
      "input",
      "media",
      "monetisation",
      "platform-specific",
      "web",
      "other"
    ),
  files: Joi.object({
    domSideScripts: Joi.array().items(Joi.string()).required(),
    extensionScript: Joi.object({
      enabled: Joi.boolean().required(),
      watch: Joi.boolean().required(),
      targets: Joi.array().items(Joi.string().valid("x86", "x64")).required(),
      name: Joi.string().optional(),
    })
      .required()
      .allow({}),
    fileDependencies: Joi.array()
      .items(
        Joi.object({
          filename: Joi.string().required(),
          type: Joi.string()
            .valid(
              "copy-to-output",
              "inline-script",
              "external-dom-script",
              "external-runtime-script",
              "external-css"
            )
            .required(),
        }).when(Joi.object({ type: Joi.string().valid("copy-to-output") }), {
          then: Joi.object({
            fileType: Joi.string().required(),
          }),
        })
      )
      .required(),
  }).required(),
  aceCategories: Joi.object().pattern(Joi.string(), Joi.string()).default({}),
  info: Joi.object({
    icon: Joi.string().optional(),
    Set: Joi.object({
      IsResizable: Joi.boolean().default(false),
      IsRotatable: Joi.boolean().default(false),
      Is3D: Joi.boolean().default(false),
      HasImage: Joi.boolean().default(false),
      IsTiled: Joi.boolean().default(false),
      SupportsZElevation: Joi.boolean().default(false),
      SupportsColor: Joi.boolean().default(false),
      SupportsEffects: Joi.boolean().default(false),
      MustPreDraw: Joi.boolean().default(false),
      IsSingleGlobal: Joi.boolean().default(false),
      CanBeBundled: Joi.boolean().default(true),
      IsDeprecated: Joi.boolean().default(false),
      GooglePlayServicesEnabled: Joi.boolean().default(false),
    }).required(),
    AddCommonACEs: Joi.object({
      Position: Joi.boolean().default(false),
      SceneGraph: Joi.boolean().default(false),
      Size: Joi.boolean().default(false),
      Angle: Joi.boolean().default(false),
      Appearance: Joi.boolean().default(false),
      ZOrder: Joi.boolean().default(false),
    }).required(),
  })
    .required()
    .when(Joi.object({ type: Joi.string().valid("world") }), {
      then: Joi.object({
        defaultImageUrl: Joi.string().optional(),
      }),
    }),
  properties: Joi.array().items(propertySchema).default([]),
});

export {
  actionSchema,
  conditionSchema,
  expressionSchema,
  propertySchema,
  configSchema,
};

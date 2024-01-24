import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function FAQ() {
  const FAQ_ITEMS = [
    {
      id: 6,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 7,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 8,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 9,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
  ];
  const FAQ_ITEMS_2 = [
    {
      id: 1,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 2,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 3,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 4,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
  ];
  return (
    <>
      <div className="flex flex-col justify-center items-center pb-24">
        <div className="flex flex-col items-center justify-center text-center text-white gap-2">
          <p className=" font-SpaceGro text-5xl text-white z-10">FAQ</p>
          <p>The most common questions</p>
        </div>
        <div className="flex w-full justify-between">
          <div className="h-full flex flex-col  w-1/2 sm:w-full rounded-lg">
            <div className="  text-white/75 p-4 gap-2 flex flex-col">
              <Accordion
                variant="light"
                showDivider={false}
                defaultExpandedKeys={["key1"]}
                itemClasses={{
                  base: "w-full py-2",
                  heading:
                    " data-[open=true]:bg-dark-gray  bg-dark-gray px-4 py-2 rounded",
                  indicator: " text-white data-[open=true]:text-white",
                  content: "px-3 rounded mt-2 bg-dark text-[#9d9d9d]",
                  trigger: "mt-2",
                  title: " text-white text-sm data-[open=true]:text-white",
                }}>
                {FAQ_ITEMS.map((item) => (
                  <AccordionItem
                    key={"key" + item.id.toString()}
                    title={item.query}>
                    <div>{item.answer}</div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="h-full flex flex-col  w-1/2 sm:w-full rounded-lg">
            <div className="  text-white/75 p-4 gap-2 flex flex-col">
              <Accordion
                variant="light"
                showDivider={false}
                defaultExpandedKeys={["key2"]}
                itemClasses={{
                  base: "w-full py-2",
                  heading:
                    " data-[open=true]:bg-dark-gray  bg-dark-gray px-4 py-2 rounded",
                  indicator: " text-white data-[open=true]:text-white",
                  content: "px-3 rounded mt-2 bg-dark text-[#9d9d9d]",
                  trigger: "mt-2",
                  title: " text-white text-sm data-[open=true]:text-white",
                }}>
                {FAQ_ITEMS_2.map((item) => (
                  <AccordionItem
                    key={"key" + item.id.toString()}
                    title={item.query}>
                    <div>{item.answer}</div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

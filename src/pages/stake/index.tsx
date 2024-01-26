import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Tab,
  Image,
  Tabs,
} from "@nextui-org/react";
import classNames from "classnames";

export default function Stake() {
  const MOCK_POSITIONS = [
    {
      amount: "45000",
      multipler: "20x",
      time: "1y:9m:19h",
    },
    {
      amount: "45000",
      multipler: "20x",
      time: "1y:9m:19h",
    },
    {
      amount: "45000",
      multipler: "20x",
      time: "1y:9m:19h",
    },
    {
      amount: "45000",
      multipler: "20x",
      time: "1y:9m:19h",
    },
  ];
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(30);
  const [selectedMultipler, setSelectedMultipler] = useState<number>(1);
  const [stakeInput, setStakeInput] = React.useState<string>("");

  const [selectedKeys, setSelectedKeys] = useState(new Set(["Select Time"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const selectedTimeVeriable = (time: number) => {
    setSelectedDays(time);
    if (time === 30) {
      setSelectedKeys(new Set(["Select Time"]));
      setSelectedMultipler(1);
    } else if (time === 90) {
      setSelectedKeys(new Set(["Select Time"]));
      setSelectedMultipler(1.5);
    } else if (time === 180) {
      setSelectedKeys(new Set(["Select Time"]));
      setSelectedMultipler(2);
    } else if (time === 365) {
      setSelectedMultipler(4);
    } else if (time === 730) {
      setSelectedMultipler(8);
    } else if (time === 1095) {
      setSelectedMultipler(12);
    } else if (time === 1460) {
      setSelectedMultipler(16);
    } else if (time === 1825) {
      setSelectedMultipler(20);
    }
  };
  const handleStakeInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value.toString();
    setStakeInput(newValue);
    try {
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <div className="flex justify-between w-full h-[84vh] px-[10%] relative overflow-hidden">
        <div
          style={{ width: "900px", height: "800px" }}
          className="dual-background absolute top-0 right-0 z-0 blur-3xl opacity-25"></div>
        <div className="flex flex-col justify-center w-[49%] gap-5">
          <div className="text-white text-5xl font-SpaceGro">
            <span className="text-[#a664fe]">Stake</span> your $GMXPs to join
            the best <span className="text-[#a664fe]">IGOs</span>
          </div>
          <Button radius="sm" className="max-w-[130px] bg-[#a664fe] text-white">
            Buy $GMXP
          </Button>
          <div className="flex items-center gap-2">
            <p className="text-[#9d9d9d] font-semibold">AVAILABLE ON:</p>
            <Image width={190} src="/chains/skale-name.svg" />
          </div>
          <div className="bg-gray-800/50 text-white/75 p-3 rounded-lg">
            Legacy $GMXP staking pools are closed. The new pools are open with
            Seed Staking Boosters. You can deposit now.
          </div>
        </div>

        <div className="w-[49%] bg-dark-gray rounded-lg flex flex-col z-10 scale-95 -mr-5">
          <div className=" flex gap-3 p-3 border-b border-gray-800/50">
            <Button
              onPress={() => setActiveTab(0)}
              className={classNames(
                "px-10",
                activeTab === 0
                  ? "bg-dark text-white"
                  : "bg-transparent text-white/50"
              )}>
              Stake
            </Button>
            <Button
              onPress={() => setActiveTab(1)}
              className={classNames(
                "px-10",
                activeTab === 1
                  ? "bg-dark text-white"
                  : "bg-transparent text-white/50"
              )}>
              My Pools
            </Button>
          </div>
          {activeTab === 0 ? (
            <div className="p-5 flex flex-col gap-5">
              <div className="flex justify-between w-full">
                <div className="relative text-white">
                  <Button
                    size="lg"
                    radius="sm"
                    onPress={() => selectedTimeVeriable(30)}
                    className={classNames(
                      "w-full px-8",
                      selectedDays === 30
                        ? "bg-[#a664fe] text-white"
                        : "bg-gray-800/50 text-white/50"
                    )}>
                    30 Days
                  </Button>
                  <div className="absolute -top-4 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                    1x
                  </div>
                </div>
                <div className="relative text-white">
                  <Button
                    size="lg"
                    radius="sm"
                    onPress={() => selectedTimeVeriable(90)}
                    className={classNames(
                      "w-full px-8",
                      selectedDays === 90
                        ? "bg-[#a664fe] text-white"
                        : "bg-gray-800/50 text-white/50"
                    )}>
                    90 Days
                  </Button>
                  <div className="absolute -top-4 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                    1.5x
                  </div>
                </div>
                <div className="relative text-white">
                  <Button
                    size="lg"
                    radius="sm"
                    onPress={() => selectedTimeVeriable(180)}
                    className={classNames(
                      "w-full px-8",
                      selectedDays === 180
                        ? "bg-[#a664fe] text-white"
                        : "bg-gray-800/50 text-white/50"
                    )}>
                    180 Days
                  </Button>
                  <div className="absolute -top-4 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                    2x
                  </div>
                </div>
                <div className="relative text-white ">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        size="lg"
                        radius="sm"
                        className={classNames(
                          "w-full",
                          selectedDays > 180
                            ? "bg-[#a664fe] text-white"
                            : "bg-gray-800/50 text-white/50"
                        )}>
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedKeys}
                      // @ts-ignore
                      onSelectionChange={setSelectedKeys}>
                      <DropdownItem
                        onPress={() => selectedTimeVeriable(365)}
                        key="1_Year">
                        365 Days
                      </DropdownItem>
                      <DropdownItem
                        onPress={() => selectedTimeVeriable(730)}
                        key="2_Year">
                        730 Days
                      </DropdownItem>
                      <DropdownItem
                        onPress={() => selectedTimeVeriable(1095)}
                        key="3_Year">
                        1095 Days
                      </DropdownItem>
                      <DropdownItem
                        onPress={() => selectedTimeVeriable(1460)}
                        key="4_Year">
                        1460 Days
                      </DropdownItem>
                      <DropdownItem
                        onPress={() => selectedTimeVeriable(1825)}
                        key="5_Year">
                        1825 Days
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <div className="absolute -top-4 z-10 right-2 bg-black border border-white rounded-full w-7 h-7 text-xs flex items-center justify-center">
                    {selectedMultipler > 3 ? `${selectedMultipler}x` : ""}
                  </div>
                </div>
              </div>
              <div className="text-[#a664fe] text-xs">
                {`1% $GMXP APR, 50% negative impact (${selectedMultipler}x) on seed staking points
                generation per $GMXP`}
              </div>
              <div className="flex justify-between text-[#9d9d9d]">
                <p>Staked Amount</p>
                <div>{`0 $GMXP`}</div>
              </div>
              <div className="flex justify-between text-[#9d9d9d]">
                <p>Wallet Balance</p>
                <div>{`0 $GMXP`}</div>
              </div>
              <div className="flex justify-between text-[#9d9d9d]">
                <p>Earned to Date</p>
                <div className="flex items-center gap-2">
                  <div>{`0 $GMXP`}</div>-<div>{`0 $SGMXP`}</div>
                </div>
              </div>
              <div className="flex items-center justify-between w-full text-white border border-gray-800/50 rounded-lg p-2">
                <p className="text-[#9d9d9d]">Claimable Rewards:</p>
                <div className="flex gap-2">
                  <div>{`0 $GMXP`}</div>-<div>{`0 $SGMXP`}</div>
                </div>

                <Button
                  radius="sm"
                  className="bg-transparent text-white border border-gray-800/50 px-7">
                  Claim
                </Button>
              </div>
              <div className="flex flex-col gap-5 border border-gray-800/50 p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-white">Create New Position</p>
                  <div className="text-white">
                    Total Score: {selectedMultipler}x
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <Input
                    size="sm"
                    value={stakeInput}
                    radius="sm"
                    onInput={handleStakeInput}
                    type="text"
                    placeholder="Enter Stake Amount"
                    classNames={{
                      input:
                        " bg-transparent text-white dark:text-white placeholder:text-white dark:placeholder:text-white/60",
                      inputWrapper:
                        "dark:bg-[#a664fe] hover:bg-white  dark:hover:bg-[#a664fe] focus-within:!bg-[#a664fe] rounded-r-none",
                      innerWrapper: "bg-transparent",
                    }}
                    className=" text-white w-[95%] whitespace-nowrap p-0 rounded-r-none"
                  />
                  <div className="flex items-center">
                    <Button
                      size="lg"
                      radius="sm"
                      className="bg-[#a664fe] rounded-l-none border-l border-gray-800/50 text-white bottom-0 right-0">
                      MAX
                    </Button>
                  </div>
                </div>
                <Button radius="sm" className="bg-[#a664fe] text-white text-lg">
                  Stake
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 p-5">
              <div className="flex justify-between">
                <div className="flex flex-col w-[33%] gap-3 text-white items-center justify-center border-r border-gray-800/50">
                  <p>APR Rate</p>
                  <p className="text-[#9d9d9d]">1%</p>
                </div>
                <div className="flex flex-col gap-3 w-[33%] text-white items-center justify-center border-r border-gray-800/50">
                  <p>Earned to Date</p>
                  <p className="text-[#9d9d9d]">$0</p>
                </div>
                <div className="flex flex-col gap-3 w-[33%] text-white items-center justify-center">
                  <p>Total Score</p>
                  <p className="text-[#9d9d9d]">80x</p>
                </div>
              </div>
              {MOCK_POSITIONS.map((item: any, index: number) => (
                <div key={"positions_" + index.toString()}>
                  <div className="rounded-lg border border-gray-800/50 p-3 flex justify-between">
                    <div className="flex items-center gap-1 text-white">
                      <Image width={20} src="/logos/gmx-logo.svg" />
                      {item.amount}
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <p className="text-[#9d9d9d]">Multipler:</p>
                      {item.multipler}
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <p className="text-[#9d9d9d]">Release in:</p>
                      {item.time}
                    </div>
                    <Button
                      radius="sm"
                      className="bg-transparent border border-gray-800/50 text-white">
                      Unstake
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

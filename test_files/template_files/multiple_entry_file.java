+++ test/test_item.java
@@@ after:// Register Items @@@
  public static final RegistryObject<Item> TEST_ITEM = ITEMS.register("test_item",
    () -> new Item(new Item.Properties().tab(CreativeModeTab.TAB_MATERIALS)));

+++ test/test_item_2.java
@@@ before:// Register Items @@@
  public static final RegistryObject<Item> TEST_ITEM_2 = ITEMS.register("test_item_2",
    () -> new Item(new Item.Properties().tab(CreativeModeTab.TAB_MATERIALS)));

+++ test/test_item_3.java
@@@ after:// Deregister Items @@@
  public static final RegistryObject<Item> TEST_ITEM_3 = ITEMS.register("test_item_3",
    () -> new Item(new Item.Properties().tab(CreativeModeTab.TAB_MATERIALS)));

+++ test/test_item_4.java
@@@ create @@@
  public static final RegistryObject<Item> TEST_ITEM_4 = ITEMS.register("test_item_4",
    () -> new Item(new Item.Properties().tab(CreativeModeTab.TAB_MATERIALS)));

+++ test/test_item_5.java
@@@ create:overwrite @@@
  public static final RegistryObject<Item> TEST_ITEM_5 = ITEMS.register("test_item_5",
    () -> new Item(new Item.Properties().tab(CreativeModeTab.TAB_MATERIALS)));

+++ test/file.java
@@@ after:// Register Items @@@
  public static final RegistryObject<Item> TEST_ITEM = ITEMS.register("test_item",
    () -> new Item(new Item.Properties().tab(CreativeModeTab.TAB_MATERIALS)));
tinymce.PluginManager.add('snippet', function (editor, url) {

    editor.on('PreInit', function (e) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", url + "/css/snippet.css");
        document.getElementsByTagName("head")[0].appendChild(fileref);
    });

    var snippet_data = editor.getParam('snippet_list');

    function addItems(data) {
        var menu = [];
        for (var i = 0; i < data.length; i++) {
            if (typeof data[i].title !== "undefined") {
                var menuItem;

                if (typeof data[i].items !== "undefined") {
                    menuItem = {
                        text: data[i].title,
                        menu: addItems(data[i].items)
                    };
                }
                else {
                    menuItem = {
                        text: data[i].title,
                        onclick: function (item) {
                            return function () {
                                if(typeof item.value !== "undefined") {
                                    editor.insertContent(item.value);
                                }
                                if (typeof item.onSelect === "function") {
                                    item.onSelect(item);
                                }
                            }
                        }(data[i])
                    };
                }
                menu.push(menuItem);
            }
        }

        return menu;
    }

    if (typeof snippet_data !== "undefined") {

        editor.addButton('snippet', {
            type: 'menubutton',
            text: '',
            icon: false,
            menu: addItems(snippet_data)
        });

    }

});
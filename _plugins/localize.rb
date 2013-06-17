module Jekyll
  class LocalizeTag < Liquid::Tag

    def initialize(tag_name, key, tokens)
      super
      @init = false
      @key = key.strip
    end

    def render(context)
      defaultsPath = "translations/defaults.yaml"
      @lang = context.registers[:site].config['lang']
      @translations = YAML::load(File.open("translations/#{@lang}.yaml"))
      if File.exist? defaultsPath
        @defaults = YAML::load(File.open(defaultsPath))
      end
      @init = true

      if @key[0..3] == 'page'
        tokens = @key.split('.')
        @key = context.environments.first
        while tokens.length > 0
          token = tokens.shift
          @key = @key[token]
        end
      end
      
      result = @translations[@key]

      if result.nil? and defined? @defaults
        result = @defaults[@key]
      end

      "#{result}"
    end
  end

  class RtlTag < Liquid::Tag
    def render(context)
      rtl = context.registers[:site].config['rtl']
      if rtl == true
        "rtl"
      else
        "ltr"
      end
    end
  end
end

Liquid::Template.register_tag('localize', Jekyll::LocalizeTag)
Liquid::Template.register_tag('rtl', Jekyll::RtlTag)
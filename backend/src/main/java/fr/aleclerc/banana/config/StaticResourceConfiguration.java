package fr.aleclerc.banana.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {


    private static final String[] ROUTER = {
            "/sprints", "/sprint/**",
            "/stories", "/story/**", "/plush", "/graph"};


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//
//        registry.addResourceHandler("swagger-ui.html")//
//                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")//
                .addResourceLocations("classpath:/META-INF/resources/webjars/");

        registry.addResourceHandler("/img/**")//
                .addResourceLocations("classpath:/img/");

        registry.addResourceHandler("/**")//
                .addResourceLocations("classpath:/static/");

        registry.addResourceHandler(ROUTER)//
                .addResourceLocations("classpath:/static/index.html");

    }


}